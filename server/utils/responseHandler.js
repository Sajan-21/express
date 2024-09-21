exports.success_function = async function(api_data){

    let response = {
        success : true,
        statusCode : 200,
        message : api_data.message ? api_data.message : null,
        data : api_data.data ? api_data.data : null
    }

    return response;

}

exports.error_function = async function(api_data){

    let response = {
        success : false,
        statusCode : 400,
        message : api_data.message ? api_data.message : null,
        data : api_data.data ? api_data.data : null
    }

    return response;

}