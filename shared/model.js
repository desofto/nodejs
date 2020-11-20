import pool from "./pool"

class GettersSetters {
  constructor() {
    this._data = {}
    this._changes = {}

    return new Proxy(this, {
      get(target, key, _receiver) {
        if(key[0] == "_") {
          return target[key]
        } else {
          return target._data[key]
        }
      },

      set(target, key, value, _receiver) {
        if(key[0] == "_") {
          target[key] = value
        } else {
          target._data[key] = value
          target._changes[key] = value
        }

        return true
      }
    })
  }
}

export default class Model extends GettersSetters {
  constructor(data) {
    super()
    this._data = data
  }

  get(name) {
    return this.data[name]
  }

  set(name, value) {
    this.data[name] = value
  }

  save() {
    return new Promise((resolve, reject) => {
      this._changes
    })
  }

  static async query(sql, params) {
    try {
      let { rows } = await pool.query(sql, params)
      return rows
    } catch (e) {
      return
    }
  }

  static async find(id) {
    let rows = await this.query(`select * from ${this.TableName} where id = $1`, [id])
    if(rows) {
      return(new this(rows[0]))
    }
  }
}