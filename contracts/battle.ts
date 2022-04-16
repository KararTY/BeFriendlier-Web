declare module '@ioc:Befriendlier-Battle' {
  type Battle = typeof import('../providers/Battle').default
  const battle: Battle
  export default battle
}
