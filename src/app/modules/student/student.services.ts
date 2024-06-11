import mongoose from 'mongoose';
import { Student } from './student.model';
import appError from '../../Error/appError';
import { User } from '../user/user.model';
import QueryBuilder from '../../bulider/QueryBuilder';
import { studentSearchableField } from './student.constent';

// const getAllStudentsFromDB = async (query:Record<string,unknown>) => {

//   const queryObject = {...query};
//   const studentSearchableField =['email','name.firstName','presentAddress'];
//   let searchTerm = '';
//   if(query?.searchTerm){
//     searchTerm = query?.searchTerm as string;
//   }

//   const searchQuery =Student.find({
//     $or:studentSearchableField.map((field)=>({
//       [field]:{$regex : searchTerm,$options: 'i'},
//     })),
//   });

//   // filtering
//   const excludeFields = ['searchTerm','sort','limit','page'];
//   excludeFields.forEach(el =>delete queryObject[el] );

//   const filterQuery =  searchQuery.find(queryObject)
//     .populate('admissionSemester')
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     });

//     let sort  = 'createdAt';
//     if(query.sort){
//       sort = query.sort as string;
//     }

//     const sortQuery =  filterQuery.sort(sort);
//     let page =1;
//     let limit = 1;
//     let skip =0;
//     if(query.limit){
//       limit = query.limit as number;
//       skip = (page-1)*limit;
//     }
//     if(query.page){
//       page = Number(query.page) ;
//     }
   
//     const pageQuery = sortQuery.skip(skip);
//     const limitQuery = pageQuery.limit(limit);

//     let fields = '__v';

//     if(query.fields){
//       fields = (query.fields as string).split(',').join(',');
//       // console.log(fields);
//     }
//     const fieldsQuery = await limitQuery.select(fields)

//   return fieldsQuery;
// };
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  
  const studentQuery  = new QueryBuilder(Student.find() .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }),query)
  .search(studentSearchableField)
  .filter()
  .sort()
  .applyPagination()
  .applyFieldSelection();
  const result = await studentQuery.modelQuery;
  return result;

};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const updateStudentIntoDB = async (id: string) => {
  const result = await Student.findByIdAndUpdate(id )

  return result;
};

const deleteStudentDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await Student.findByIdAndUpdate({ id }, { isDeleted: true }, { new: true, session });
    if (!result) {
      throw new appError(404, 'Failed deleting student');
    }

    const deletedUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
    if (!deletedUser) {
      throw new appError(404, 'Failed deleting user');
    }

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (err) {
    console.error('Transaction error:', err);

    await session.abortTransaction();
    session.endSession();

    throw err; // Re-throw the error to be handled by the caller
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentDb,
  updateStudentIntoDB
};
