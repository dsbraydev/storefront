// Runs before test framework is installed — must be plain CJS.
// Assign every global that undici reads at load time BEFORE requiring it.
const { TextEncoder, TextDecoder } = require('util')
const { ReadableStream, TransformStream, WritableStream } = require('stream/web')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
global.ReadableStream = ReadableStream
global.TransformStream = TransformStream
global.WritableStream = WritableStream

const { fetch, Request, Response, Headers, FormData, File } = require('undici')

global.fetch = fetch
global.Request = Request
global.Response = Response
global.Headers = Headers
global.FormData = FormData
global.File = File
