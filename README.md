 issue : On signIn I got a server error 500 and in the console :
"Error: Route "/" used `...headers()` or similar iteration. `headers()` should be awaited before using its value."

solution is : upgrade next-auth to ===> "next-auth": "^5.0.0-beta.25",
