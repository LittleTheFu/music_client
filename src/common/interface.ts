// ... 已有代码 ...

// 定义 RetMsgObj 类型，包含 error 属性
export interface RetMsgObj {
    error?: any; // 错误信息，使用可选属性，因为可能不存在错误
    msg: string; // 消息内容
}
