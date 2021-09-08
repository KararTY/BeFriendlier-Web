declare module '@ioc:Befriendlier-Theme' {
  type Theme = typeof import('../providers/Theme/Index').default
  const theme: Theme
  export default theme
}
