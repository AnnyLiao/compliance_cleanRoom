import axios from 'axios';

const analysisApi = axios.create({
    baseURL: 'http://localhost:8800/FintechAnonymization/api/analysis'
})

const taskApi = axios.create({
    baseURL: 'http://localhost:8800/FintechAnonymization/api/task'
})

const reportApi = axios.create({
    baseURL: 'http://localhost:8800/FintechAnonymization/api/report'
})

const fileApi = axios.create({
    baseURL: 'http://localhost:8800/FintechAnonymization/api/file'
})

const clientApi = axios.create({
    baseURL: 'http://localhost:8800/FintechAnonymization/api/client'
})


//File API
export const getColumn = data => reportApi.get(`/columnNames?file=${data}`);
export const fileUpload = data => fileApi.post('/upload', data);

//Di API
export const diCheck = data => analysisApi.get(`/diCheck?file=${data}`);
export const diCheckSync = data => analysisApi.get(`/diCheckSync?file=${data}`);
export const outliersDetect = data => analysisApi.get(`/outliersDetect?file=${data}`);
export const tupleAttributeK = data => analysisApi.get(`/tupleAttributeK?file=${data.fileDir}&columnIndices=${data.columnIndex}&expectedK=${data.ValueK}`);

//Conver API
export const deidentify = data => clientApi.post(`/deidentify?ip=${data.ip}`, data.jsonData);
export const convertStatus = data => clientApi.get(`/status?ip=${data}`);
export const convertOption = data => clientApi.post(`/option?ip=${data.ip}`, data.jsonData);

//Task API
export const historyTasksList = taskApi.get('/historyTasksList');
export const tasksList = taskApi.get('/tasksList');
export const deleteTaskByUuid = data => taskApi.get(`/deleteTaskByUuid?uuid=${data}`);

//Report API
export const report = data => reportApi.get(`?file=${data}`);