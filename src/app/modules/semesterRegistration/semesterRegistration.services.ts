import httpStatus from "http-status";
import appError from "../../Error/appError";
import { AcademySemestersSchema } from "../academicSemister/academySemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model"
import QueryBuilder from "../../bulider/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.constant";

// const creteSemesterRegistrationIntoDB = async(payload:TSemesterRegistration)=>{
//     const academySemester = payload?.academySemester;

//     const isSemesterRegistrationExist = await SemesterRegistration.findOne({
//         academySemester:academySemester
//     })

//   if(isSemesterRegistrationExist){
//     throw new appError(
//         httpStatus.NOT_FOUND,
//         'this semester is already registered!'
//     )
//    }
//    const isAcademySemesterExist = await AcademySemestersSchema.findById({academySemester});
//    if(!isAcademySemesterExist){
//     throw new appError(
//         httpStatus.NOT_FOUND,
//         'this academe  semester not found !'
//     )
//    }
//    const result  = await SemesterRegistration.create(payload);
//    return result
//   }

const creteSemesterRegistrationIntoDB = async(payload:TSemesterRegistration)=>{
    const academySemester = payload.academySemester;

    const isThereAnyUpcomingAndOutGoing= await SemesterRegistration.findOne({
        $or:[{status:'upcoming'},{status:'ongoing'}],
    })
    if(isThereAnyUpcomingAndOutGoing){
        throw new appError(
            httpStatus.BAD_REQUEST,
            `There is already an ${isThereAnyUpcomingAndOutGoing.status} Semester Registration`
        );
    }

    // Check if the semester registration already exists
    const isSemesterRegistrationExist = await SemesterRegistration.findOne({
        academySemester: academySemester
    });

    if (isSemesterRegistrationExist) {
        throw new appError(
            httpStatus.NOT_FOUND,
            'This semester is already registered!'
        );
    }

    // Check if the academy semester exists
    const isAcademySemesterExist = await AcademySemestersSchema.findById(academySemester);

    if (!isAcademySemesterExist) {
        throw new appError(
            httpStatus.NOT_FOUND,
            'This academy semester not found!'
        );
    }

    // Create the semester registration
    const result = await SemesterRegistration.create(payload);
    return result;
};

const getALlSemesterRegistrationIntoDB = async (query : Record<string, unknown>)=>{
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academySemester'),query)
    .filter()
    .sort()
    .applyPagination()
    .applyFieldSelection()
    const result = await semesterRegistrationQuery.modelQuery;
    return result;
};


const getSingleSemesterRegistrationIntoDB = async(id:string)=>{
    const result = await SemesterRegistration.findById(id).populate('academySemester');
    return result;
};

// const updateSemesterRegistrationIntoDB = async (id:string,payload:Partial<TSemesterRegistration>)=>{
//     // cheak
//     const isSemesterRegistrationExist = await SemesterRegistration.findById(id);

//     if (!isSemesterRegistrationExist) {
//         throw new appError(
//             httpStatus.NOT_FOUND,
//             'This semester is not found !'
//         );
//     }


//     // if the registration semester is enden
//     const currentSemesterStatus = isSemesterRegistrationExist?.status;
//     const requestedStatus = payload?.status;

//     if(currentSemesterStatus === RegistrationStatus.ended){
//         throw new appError(
//             httpStatus.BAD_REQUEST,
//             `There is already  ${currentSemesterStatus}`
//         )
//     }

//     // 'upcoming'|'ongoing'|'ended';

//     if(currentSemesterStatus ===RegistrationStatus.upcoming&& requestedStatus === RegistrationStatus.ended){
//         throw new appError(
//             httpStatus.BAD_REQUEST,
//             `you can not change directly ${currentSemesterStatus} to ${requestedStatus}`
//         )
//     }
//     if(currentSemesterStatus ===RegistrationStatus.ongoing&& requestedStatus === RegistrationStatus.upcoming){
//         throw new appError(
//             httpStatus.BAD_REQUEST,
//             `you can not change directly ${currentSemesterStatus} to ${requestedStatus}`
//         )
//     }
//     const result = await SemesterRegistration.findByIdAndUpdate(id,payload,{
//         new:true,
//         runValidators:true,
//     })
//     return result;
// }
const updateSemesterRegistrationIntoDB = async (
    id: string,
    payload: Partial<TSemesterRegistration>,
  ) => {
    /**
     * Step1: Check if the semester is exist
     * Step2: Check if the requested registered semester is exists
     * Step3: If the requested semester registration is ended, we will not update anything
     * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
     * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
     * Step6: If the requested semester registration is 'ENDED' , we will not update anything
     *
     * UPCOMING --> ONGOING --> ENDED
     *
     */
  
    // check if the requested registered semester is exists
    // check if the semester is already registered!
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  
    if (!isSemesterRegistrationExists) {
      throw new appError(httpStatus.NOT_FOUND, 'This semester is not found !');
    }
  
    //if the requested semester registration is ended , we will not update anything
    const currentSemesterStatus = isSemesterRegistrationExists?.status;
    const requestedStatus = payload?.status;
  
    if (currentSemesterStatus ===RegistrationStatus.ended) {
      throw new appError(
        httpStatus.BAD_REQUEST,
        `This semester is already ${currentSemesterStatus}`,
      );
    }
  
    // UPCOMING --> ONGOING --> ENDED
    if (
      currentSemesterStatus ===  RegistrationStatus.ongoing  &&
      requestedStatus === RegistrationStatus.ended
    ) {
      throw new appError(
        httpStatus.BAD_REQUEST,
        `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
      );
    }
  
    if (
      currentSemesterStatus === RegistrationStatus.ongoing &&
      requestedStatus === RegistrationStatus.upcoming
    ) {
      throw new appError(
        httpStatus.BAD_REQUEST,
        `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
      );
    }
  
    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
  
    return result;
  };

export const SemesterRegistrationService= {
    creteSemesterRegistrationIntoDB,
    getALlSemesterRegistrationIntoDB,
    getSingleSemesterRegistrationIntoDB,
    updateSemesterRegistrationIntoDB

}