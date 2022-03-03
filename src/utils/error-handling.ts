// error handling function takes argument (myFn)
// takes the value of (myFn) to excute
// return it if there is no error
// return error if catched an error

async function errorHandler(myFn?: any): Promise<any> {
   try {
      return await myFn
   } catch (err) {
      console.log(err)
      throw new Error(err)
   }
}

export default errorHandler
