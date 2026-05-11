import axios from "axios";

export const fetchRandomInstructor = async (courseId: string | number) => {
  const response = await axios.get(`https://randomuser.me/api/?seed=${courseId}&nat=br,us,es`);
  const user = response.data.results[0];
  
  return {
    name: `${user.name.first} ${user.name.last}`,
    avatar: user.picture.large,
    email: user.email,
    location: `${user.location.city}, ${user.location.country}`,
    specialty: "Instrutor Convidado Especialista"
  };
};