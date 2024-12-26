import { CategoryServices } from "../Category/Category.services";
import { TutorialServices } from "../Tutorials/Tutorial.services";
import { UserModel } from "../User/User.model";



const getNumberOfStatsFromDB = async () => {
    
    const languagesData = await CategoryServices.getAllCategoriesFromDB();
    const languages = languagesData.length;
    
    const userData = await UserModel.find();
    
    let countTutors = 0;
    let countStudents = 0;

    userData.forEach(user=>{
        if(user.role === "tutor") countTutors++;
        else if(user.role === "student") countStudents++;
    })

    const tutors = countTutors;
    const students = countStudents;

    const tutorialsData = await TutorialServices.getAllTutorialsFromDB({});
    const totalTutorials = tutorialsData.length;

    let reviewsCount = 0;

    tutorialsData.forEach(tutorial => {
        reviewsCount += tutorial.review;
    })

    const reviews = Math.ceil(reviewsCount / totalTutorials);

    return {tutors, students, reviews, languages};
  };

const getNumberOfLanguageTeacherFromDB = async () => {

    type TNumberOfLanguageTeacher = {
      title: string;
      count: number;
    }
    const numberOfLanguageTeacherList : TNumberOfLanguageTeacher[] = []
    const teacherTrack : string[] = [];
    
    
    const languagesData = await CategoryServices.getAllCategoriesFromDB();

    const tutorialsData = await TutorialServices.getAllTutorialsFromDB({});
    

    let countTeacher:number;
    languagesData.forEach(language => {
        countTeacher = 0;
        tutorialsData.forEach(tutorial => {
          if(language.title == tutorial.language){
            if(!teacherTrack.includes(`${language.title} : ${tutorial.email}`)){
              countTeacher++;
              teacherTrack.push(`${language.title} : ${tutorial.email}`)
            }
          }
      }) 
      numberOfLanguageTeacherList.push({title : language.title, count: countTeacher});
    })

    
   

    return numberOfLanguageTeacherList;
  };


  const getNumberOfTeacherDetailsFromDB = async (email: string) => {

  

    const tutorialsData = await TutorialServices.getAllTutorialsFromDB({email});
    
    const lessonsNumber = tutorialsData.length;

    let countReviews = 0;   //reviews number 
    let countStudents = 0; //students number
    let countLanguages = 0; //language count

    const languageTrack : string[] = [];
    const studentsTrack : string[] = [];



    tutorialsData.forEach(tutorial => {
      countReviews = countReviews + tutorial.review;

      if(!languageTrack.includes(tutorial.language)){
        countLanguages++;
        languageTrack.push(tutorial.language)
      }
      
      tutorial.userBooked.forEach(student => {
        
      if(!studentsTrack.includes(student.email))
        countStudents++;
        studentsTrack.push(student.email);
      })
      
    })



    return{
      lessonsNumber,
      countLanguages,
      countReviews,
      countStudents
    };


  }


  export const NumberOfFieldsServices = {
    getNumberOfStatsFromDB,
    getNumberOfLanguageTeacherFromDB,
    getNumberOfTeacherDetailsFromDB
  }