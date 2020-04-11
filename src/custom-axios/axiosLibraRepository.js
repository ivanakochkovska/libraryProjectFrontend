 import axios from '../custom-axios/axios'
// import qs from 'qs'
// /*
// const users= {
//     fetchUsersData: () => {
//         return axios.get("/adminPanel");
//     },
//
//     checkUser: (username) => {
//         const data = {
//             ...username,
//             korisnikName: username.name
//
//         }
//         /*
//         const formParams = qs.stringify(data);
//         return axios.post("/adminPanel", formParams, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'professorId': 'kostadin.mishev'
//             }
//             });
//             */
//
//          return axios.post("/adminPanel","Hello");
//
//
//
//     }
// }
// */
// export default users;


const adresa="adminPanelSearch"
const baseUrl="http://localhost:9090"
const allUrl='${baseUrl}/adresa'

class UsersRepository{
    retreiveAllUsers(name) {
        return axios.get('${allUrl}');
    }
}


export default new UsersRepository();
