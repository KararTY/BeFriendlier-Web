// https://gist.github.com/kottenator/9d936eb3e4e3c3e02598?permalink_comment_id=4218361#gistcomment-4218361

export function paginate ({ current, maxPage }: { current: number, maxPage: number }): {current: number, prev?: number, next?: number, items: Array<number|string>} | null {
  const prev = current === 1 ? undefined : current - 1
  const next = current === maxPage ? undefined : current + 1
  const items: Array<number|string> = [1]

  if (current === 1 && maxPage === 1) return { current, prev, next, items }
  if (current > 4) items.push('…')

  const r = 2
  const r1 = current - r
  const r2 = current + r

  for (let i = r1 > 2 ? r1 : 2; i <= Math.min(maxPage, r2); i++) items.push(i)

  if (r2 + 1 < maxPage) items.push('…')
  if (r2 < maxPage) items.push(maxPage)

  return { current, prev, next, items }
}
