const Countries = [
    'Germany',
    'England',
    'Greece',
    'France'
];

const API_BASE = "https://localhost:7017/api/";

const API_ENDPOINTS = {
    "GetAllClients": API_BASE + "user/get/all",
    "CreateClient": API_BASE + "user/create",
    "UpdateClient": API_BASE + "user/update",
    "RemoveClients": API_BASE + "user/remove/ids"
}

export { Countries, API_ENDPOINTS };