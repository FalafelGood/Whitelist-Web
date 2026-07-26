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

  const isPending = assignedCats.isPending || allCats.isPending
  const isError = assignedCats.isError || allCats.isError

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

  /* 
    Three different lists below:
      + The categories assigned to a channel
      + All possible categories
      + All categories that can be assigned to the channel
  */
  const assigned = assignedCats.data?.categories ?? []
  const all = allCats.data?.categories ?? []
  const addable = all.filter((c) => !assigned.includes(c))

  return (
    <Show when="signed-in">
      <div className="flex justify-center px-4 mt-6">
        <div className="card bg-neutral-100 border border-neutral-300 w-full max-w-xl shadow-md">
          <div className="card-body gap-6">
            <div className="flex items-center justify-between gap-4">
              <h1 className="card-title text-xl text-red-500">Admin Tools for "{name}"</h1>
              <UserButton />
            </div>

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

            <form
              className="flex flex-col gap-3 text-left"
              onSubmit={(e) => {
                e.preventDefault();
                // Dummy behavior -- Currently just logs the selected catagories.
                const formData = new FormData(e.currentTarget);
                const categories = formData.getAll('categories');
                console.log(categories);
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
                disabled={isPending || isError || addable.length === 0}
              >
                Submit
              </button>
            </form>

            <div className="divider my-0 text-sm">DANGER ZONE</div>

            <div className="flex flex-col gap-2">
              <span className="btn btn-neutral text-red-500">
                Blacklist "{name}"
              </span>
            </div>
          </div>
        </div>
      </div>
    </Show>
  )
}

export default AdminChannel;
