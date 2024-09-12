const asyncHandler = (func: Function) => {
    return async (...args: any[]) => {
      try {
        await func(...args);
      } catch (error) {
        console.error(error);
        
      }
    };
  };
  
  export default asyncHandler;
  
  