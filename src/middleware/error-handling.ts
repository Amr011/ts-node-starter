export default async function errorHandler(anyFunction?: any): Promise<any> {
   try {
      await anyFunction
      return anyFunction
   } catch (err: any) {
      throw new Error(err)
   }
}
