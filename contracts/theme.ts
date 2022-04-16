declare module '@ioc:Befriendlier-Theme' {
  type Theme = typeof import('../providers/Theme').default
  const theme: Theme
  export default theme
}
