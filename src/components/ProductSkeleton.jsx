export default function ProductSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="animate-pulse rounded-[2.5rem] border border-stone-200 bg-white p-10 shadow-sm shadow-stone-900/5">
        <div className="mx-auto h-96 w-full max-w-md rounded-3xl bg-stone-100" />
      </div>
      <div className="animate-pulse space-y-6 rounded-[2.5rem] border border-stone-200 bg-white p-8 shadow-sm shadow-stone-900/5">
        <div className="space-y-3">
          <div className="h-6 w-24 rounded-full bg-stone-100" />
          <div className="h-8 w-2/3 rounded-full bg-stone-100" />
          <div className="h-4 w-1/2 rounded-full bg-stone-100" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded-full bg-stone-100" />
          <div className="h-3 w-5/6 rounded-full bg-stone-100" />
          <div className="h-3 w-4/6 rounded-full bg-stone-100" />
        </div>
        <div className="h-16 rounded-2xl bg-stone-100" />
        <div className="h-12 rounded-2xl bg-stone-100" />
      </div>
    </div>
  )
}

