import req from './https';

export const historyTasksList = () => req('get', '/task/historyTasksList');
export const tasksList = () => req('get', '/task/tasksList');
export const deleteTaskByUuid = data => req('get', `/task/deleteTaskByUuid?uuid=${data}`);