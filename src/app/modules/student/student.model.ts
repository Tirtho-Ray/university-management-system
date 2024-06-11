import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});


const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true },
  user:{
    type:Schema.Types.ObjectId,
    required: [true,'user id must required'],
    unique: true,
    ref:'User',
  },
  // password: { type: String, required: true },
  name: userNameSchema,
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  admissionSemester:{
    type:Schema.Types.ObjectId,
    // unique: true,
    ref:'AcademySemester',
  },
  academicDepartment:{
    type:Schema.Types.ObjectId,
    // unique: true,
    ref:'AcademicDepartment',
  },
  isDeleted:{
    type:Boolean,
    default:false
},
  profileImg: { type: String },
},{
  toJSON:{
    virtuals:true,
  }
});

// virtual
studentSchema.virtual('fullName').get(function(){
  // return this.name.firstName+this.name.middleName+this.name.lastName;
  return(
    `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
  )
})


// middleware functions pre save: will work on create and save methods



// query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('aggregate',function(next){
  // this.find({isDeleted:{$ne: true}})
  this.pipeline().unshift({$match:{isDeleted :{$ne:true}} });
  next();
})



// creating a custom instanceof
// studentSchema.methods.isUserExists = async function (id:string){
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// }

// creating custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
