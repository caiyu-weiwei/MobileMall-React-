/**
 * 配置中间件
 */

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
let middlewares = []
const logger = createLogger()
middlewares = [...middlewares, thunk, logger]

export default middlewares