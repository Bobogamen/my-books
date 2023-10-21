// const host = 'http://localhost:8080/'
// async function request(url, method, data) {
//       const options = {
//           credentials: 'include',
//           method: method,
//           headers: {
//               'Accept': 'application/json',
//               'Content': 'application/json',
//               'Cache': 'no-cache'
//           }
//       }
//
//       if (data !== undefined) {
//           options.body = data
//       }
//
//       const result = await fetch(url, options);
//
//       if (result.status === 204) {
//           return result
//       } else {
//           return result.json();
//       }
//   }
//
// export async function GET(url) {
//       return request(url, 'GET')
// }
//
// export async function POST(url, data) {
//       return request(url, 'POST', data)
// }
//
// export async function PUT(url, data) {
//       return request(url, 'PUT', data)
// }
//
// export async function DEL(url) {
//       return request(url, 'DELETE')
// }