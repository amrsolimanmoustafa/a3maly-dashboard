export type ContextType = {
  count: number
  fetch: (page: number, rowsPerPage: number, filter?: string) => void
  add: (record: any) => void
  edit: (record: any) => void
  remove: (record_id: string) => void
  suspend: (id: string) => void
  selected: string[],
  setSelected: (x: string[]) => void
  suspendSelected: () => void
  removeSelected: () => void
}