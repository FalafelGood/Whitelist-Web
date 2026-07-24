// J.M.J.
import { Show, UserButton, useAuth } from '@clerk/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { formatCategoryText } from '../pages/CategoriesPage'

function AdminChannel({ name, channelId }) {
  const { getToken } = useAuth()
  /* 
    useQueryClient returns the current QueryClient instance.
    QueryClient can be used to interact with a cache.
    In this case, QueryClient will be used to update the query when I've deleted a channel
    category.
  */
  const queryClient = useQueryClient()
  const queryKey = ['channelCategories', channelId]

  const { data, isPending, isError } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/channel_categories?channel=${channelId}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    },
    enabled: !!channelId,
  })

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
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const categories = data?.categories ?? []

  return (
    <Show when="signed-in">
      <div className="flex justify-center px-4 mt-6">
        <div className="card bg-neutral-100 border border-neutral-300 w-full max-w-md shadow-md">
          <div className="card-body gap-6">
            <div className="flex items-center justify-between gap-4">
              <h1 className="card-title text-xl text-red-500">Admin Tools for "{name}"</h1>
              <UserButton />
            </div>

            <div>
              <span className="label-text mb-2 block">Channel categories</span>
              {isPending && <p className="text-sm text-neutral-500">Loading categories…</p>}
              {isError && <p className="text-sm text-error">Failed to load categories.</p>}
              {!isPending && !isError && categories.length === 0 && (
                <p className="text-sm text-neutral-500">No categories yet.</p>
              )}
              {categories.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
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

            <form className="flex flex-col gap-3 text-left">
              <label className="form-control">
                <span className="label-text mb-1">Add new category</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    className="input w-full flex-1 bg-white text-black"
                    placeholder="Channel category (e.g. slice_of_life)"
                  />
                  <button type="submit" className="btn btn-warning sm:w-auto">
                    Submit
                  </button>
                </div>
              </label>
            </form>

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
