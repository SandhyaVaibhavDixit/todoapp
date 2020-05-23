import http from "../_utils/httpCommon";

export const getAll = () => {
    return http.get("/todos");
};
  
export const get = id => {
    return http.get(`/todos/${id}`);
};
  
export const create = data => {
    return http.post("/todos", data);
};
  
export const remove = id => {
    return http.delete(`/todos/${id}`);
};

export const update = (id, data) => {
    return http.put(`/todos/${id}`, data);
}