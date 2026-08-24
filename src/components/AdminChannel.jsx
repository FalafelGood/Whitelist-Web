// J.M.J.
import { Show, UserButton, useAuth } from '@clerk/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { formatCategoryText } from '../pages/CategoriesPage'

function AdminChannel({ name, channelId }) {
  const { getToken } = useAuth()
  /* 
    useQueryClient returns the current QueryClient instance.
    QueryClient can be used to interact with a cache.
    In this case, QueryClient will be used to update the query when I've deleted a channel category.
  */
  const queryClient = useQueryClient()

  // Query for categories that are assigned to the channel
  const assignedCats = useQuery({
    queryKey: ['channelCategories', channelId],
    queryFn: async () => {
      const res = await fetch(`/api/channel_categories?channel=${channelId}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    },
    enabled: !!channelId,
  })

  // Query for all categories
  const allCats = useQuery({
    queryKey: ['allCategories'],
    queryFn: async () => {
      const res = await fetch('/api/channel_categories')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    },
  })

  // Query for channel metadata
  const channelData = useQuery({
    queryKey: ['channels', channelId],
    queryFn: async() => {
      const res = await fetch(`/api/channels?cid=${channelId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  })

  const isPending = assignedCats.isPending || allCats.isPending || channelData.isPending
  const isError = assignedCats.isError || allCats.isError || channelData.isError

  const deleteCategory = useMutation({
    mutationFn: async (category) => {
      const token = await getToken()
      const res = await fetch(
        `/api/channel_categories?channel=${channelId}&category=${encodeURIComponent(category)}`,
        {
          method: 'DELETE',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    },
    /*
      If onSuccess, the cache is now out of date. We invalidate the old query which, 
      if I'm reading the docs right, will trigger a refresh.

      Source: https://tanstack.com/query/v5/docs/framework/react/guides/query-invalidation
    */
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelCategories', channelId] })
    },
  })

  const updateCategories = useMutation({
    mutationFn: async (categories) => {
      const token = await getToken()
      const res = await fetch(
        `/api/channel_categories?channel=${channelId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ categories }),
        }
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    },
    /*
      Like before, the cache is out of date. Invalidate old query.

      Source: https://tanstack.com/query/v5/docs/framework/react/guides/query-invalidation
    */
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channelCategories', channelId] })
    },
  })

  const exposeVideos = useMutation({
    mutationFn: async () => {
      const token = await getToken()
      const res = await fetch(
        `/api/expose_videos?cid=${channelId}`,
        {
          method: 'GET',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels', channelId] })
    },
  })

  /* 
    Three different lists below:
      + The categories assigned to a channel
      + All possible categories
      + All categories that can be assigned to the channel
  */
  const assigned = assignedCats.data?.categories ?? []
  const all = allCats.data?.categories ?? []
  const addable = all.filter((c) => !assigned.includes(c))

  // Some important stats about the channel
  const {
    video_count: videoCount,
    video_review_count: videoReviewCount,
    offensive_videos_count: offensiveVideosCount,
    low_quality_videos_count: lowQualityVideosCount,
    videos_exposed_count: videosExposedCount,
    human_moderation_status: humanModerationStatus,
  } = channelData.data?.channel?.[0] ?? {}

  return (
    <Show when="signed-in">
      <div className="flex justify-center px-4 mt-6">
        <div className="card bg-neutral-100 border border-neutral-300 w-full max-w-2xl shadow-md">
          <div className="card-body gap-6">
            <div className="flex items-center justify-between gap-4">
              <h1 className="card-title text-xl text-red-500">Admin Tools for "{name}"</h1>
              <UserButton />
            </div>

            {/* 
            DELETE CATEGORIES BAR
            */}
            <div>
              <span className="label-text mb-2 block">Channel categories</span>
              {isPending && <p className="text-sm text-neutral-500">Loading categories…</p>}
              {isError && <p className="text-sm text-error">Failed to load categories.</p>}
              {!isPending && !isError && assigned.length === 0 && (
                <p className="text-sm text-neutral-500">No categories yet.</p>
              )}
              {assigned.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {assigned.map((cat) => (
                    <div
                      key={cat}
                      className="flex items-center justify-between gap-1 rounded-lg border border-neutral-300 bg-white px-2 py-1.5 text-sm"
                    >
                      <span className="truncate">{formatCategoryText(cat)}</span>
                      <button
                        type="button"
                        className="btn btn-ghost btn-xs min-h-0 h-6 w-6 p-0 text-error"
                        aria-label={`Remove ${cat}`}
                        disabled={deleteCategory.isPending}
                        onClick={() => {
                          const label = formatCategoryText(cat)
                          if (window.confirm(`Remove category "${label}" from this channel?`)) {
                            deleteCategory.mutate(cat)
                          }
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {deleteCategory.isError && (
              <p className="text-sm text-error">{updateCategories.error.message}</p>
            )}

            {/* 
            UPDATE CATEGORIES FORM 
            */}
            <form
              className="flex flex-col gap-3 text-left"
              onSubmit={(e) => {
                e.preventDefault();
                // Dummy behavior -- Currently just logs the selected catagories.
                const formData = new FormData(e.currentTarget);
                const categories = formData.getAll('categories');
                updateCategories.mutate(categories);
              }}
            >
              <span className="label-text mb-1">Add categories</span>
              {isPending && (
                <p className="text-sm text-neutral-500">Loading categories…</p>
              )}
              {isError && (
                <p className="text-sm text-error">Failed to load categories.</p>
              )}
              {!isPending && !isError && addable.length === 0 && (
                <p className="text-sm text-neutral-500">
                  No more categories to assign
                </p>
              )}
              {addable.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {addable.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-2 py-1.5 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        name="categories"
                        value={cat}
                      />
                      <span className="truncate">{formatCategoryText(cat)}</span>
                    </label>
                  ))}
                </div>
              )}
              <button
                type="submit"
                className="btn btn-warning self-start"
                disabled={
                  isPending || 
                  isError || 
                  addable.length === 0 ||
                  updateCategories.isPending
                }
              >
                Submit
              </button>
            </form>

            {updateCategories.isError && (
              <p className="text-sm text-error">{updateCategories.error.message}</p>
            )}

            {!isPending && (
              <>
                <p>Videos exposed: {videosExposedCount}</p>
                <p>Videos reviewed: {videoReviewCount}</p>
                <p>Total videos: {videoCount}</p>
              </>
            )}
            
            <div className="flex flex-row justify-center mb-4">
              <button
                type="button"
                className="btn btn-warning w-50"
                disabled={exposeVideos.isPending}
                onClick={() => exposeVideos.mutate()}
              >
                {exposeVideos.isPending ? 'Exposing…' : 'Expose 50 videos'}
              </button>
            </div>

            {exposeVideos.isError && (
              <p className="text-sm text-error">{exposeVideos.error.message}</p>
            )}

            <div className="divider my-0 text-sm">DANGER ZONE</div>

            <div className="flex flex-row justify-center gap-2">
              <button 
                className="btn btn-neutral text-red-500"
                disabled={channelData.isPending || humanModerationStatus === 'banned'}
                >
                Blacklist "{name}"
              </button>
              <button 
                className="btn btn-outline text-red-500"
                disabled={channelData.isPending || humanModerationStatus === 'approved'}
                >
                Whitelist "{name}"
              </button>
            </div>
          </div>
        </div>
      </div>
    </Show>
  )
}

export default AdminChannel;
