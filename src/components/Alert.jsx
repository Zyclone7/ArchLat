const Alert = ({ message, type }) => {
    const baseStyle = 'p-4 mb-4 text-sm rounded';
    const types = {
      success: 'bg-green-100 text-green-700',
      error: 'bg-red-100 text-red-700',
      warning: 'bg-yellow-100 text-yellow-700',
      info: 'bg-blue-100 text-blue-700',
    };
  
    return (
      <div className={`${baseStyle} ${types[type]}`}>
        {message}
      </div>
    );
  };
  
  export default Alert;
  