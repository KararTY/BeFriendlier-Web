import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export interface AlgorithmObject {
  applyOn: string
  cleanEval: string
  applyEval: string
}

export default class BattleStatisticAlgorithm extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public statistic: string

  @column({
    prepare: (value: AlgorithmObject) => JSON.stringify(value),
    consume: (value: any) => {
      if (typeof value === 'string') {
        return JSON.parse(value)
      } else {
        return value
      }
    }
  })
  public func: AlgorithmObject

  @column()
  public version: number
}
