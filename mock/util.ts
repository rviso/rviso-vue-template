/**
 * 生成成功的返回结果
 * @param {*} result 返回结果
 * @param {*} param1 额外参数
 * @returns
 */
export function resultSuccess(data?: any, { message = 'ok' } = {}) {
  return {
    code: 0,
    data,
    message,
    type: 'success'
  }
}

/**
 * 生成分页的返回结果
 * @param {*} page 页码
 * @param {*} pageSize 每页数量
 * @param {*} list 数据列表
 * @param {*} param2 额外参数
 */
export function resultPageSuccess(
  page: number,
  pageSize: number,
  list: any[],
  { message = 'ok' } = {}
) {
  const pageData = pagination(page, pageSize, list)

  return {
    ...resultSuccess({
      list: pageData,
      total: list.length
    }),
    message
  }
}

/**
 * 生成失败的返回结果
 * @param {*} message 错误信息
 * @param {*} param1 额外参数
 * @returns 返回结果
 */
export function resultError(
  message = 'Request failed',
  { code = -1, result = null } = {}
) {
  return {
    code,
    result,
    message,
    type: 'error'
  }
}

/**
 * 生成无权限的返回结果
 * @param {*} message 错误信息
 * @param {*} param1 额外参数
 * @returns 返回结果
 */
export function resultNoPermission(
  message = 'No permission',
  { code = -1, result = null } = {}
) {
  return {
    code,
    result,
    message,
    type: 'noPermission'
  }
}

/**
 * 进行分页
 * @param {*} pageNo 页码
 * @param {*} pageSize 每页数量
 * @param {*} array 数据列表
 */
export function pagination(pageNo: number, pageSize: number, array: any[]) {
  if (!pageNo || !pageSize) return array

  const offset = (pageNo - 1) * Number(pageSize)
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize))
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: { headers: any }) {
  return headers?.authorization
}
