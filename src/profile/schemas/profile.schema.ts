import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

class BasicInfo {
  @Prop() employeeNo: string;
  @Prop() firstName: string;
  @Prop() middleName: string;
  @Prop() lastName: string;
  @Prop() personalEmail: string;
}

class EmergencyContact {
  @Prop() name: string;
  @Prop() number: string;
}

class ContactInfo {
  @Prop() workEmail: string;
  @Prop() workPhone: string;
  @Prop() mobilePhone: string;
  @Prop() residencePhone: string;
  @Prop() emergencyContact: EmergencyContact;
}

class Work {
  @Prop() department: string;
  @Prop() dateOfJoining: string;
  @Prop() location: string;
  @Prop() timezone: string;
  @Prop() shift: string;
  @Prop() seatingLocation: string;
  @Prop() salaryRevisionDueOn: string;
  @Prop() symphonyAccessCardNo: string;
}

class Personal {
  @Prop() birthDate: string;
  @Prop() maritalStatus: string;
  @Prop() aadhaarNumber: string;
  @Prop() esicNumber: string;
  @Prop() uan: string;
  @Prop() tshirtSize: string;
  @Prop() permanentAddress: string;
  @Prop() presentAddress: string;
  @Prop() age: number;
  @Prop() bloodGroup: string;
  @Prop() pan: string;
  @Prop() epfNo: string;
}

class Summary {
  @Prop() jobDescription: string;
  @Prop([String]) askMeAbout: string[];
  @Prop() experience: string;
  @Prop() aboutMe: string;
}

class PassportDetails {
  @Prop() passportNumber: string;
  @Prop() passportExpiry: string;
  @Prop() visaNumber: string;
  @Prop() visaExpiry: string;
}

class WorkExperience {
  @Prop() company: string;
  @Prop() role: string;
  @Prop() from: string;
  @Prop() to: string;
}

class FamilyMediclaim {
  @Prop() member: string;
  @Prop() relation: string;
  @Prop() dob: string;
  @Prop() sumInsured: number;
}

class VehiclePassDetails {
  @Prop() vehicleType: string;
  @Prop() registrationNo: string;
  @Prop() validTill: string;
}

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: BasicInfo })
  basicInfo: BasicInfo;

  @Prop({ type: ContactInfo })
  contactInfo: ContactInfo;

  @Prop({ type: Work })
  work: Work;

  @Prop({ type: Personal })
  personal: Personal;

  @Prop({ type: Summary })
  summary: Summary;

  @Prop({ type: PassportDetails })
  passportDetails: PassportDetails;

  @Prop({ type: [WorkExperience] })
  workExperience: WorkExperience[];

  @Prop({ type: [FamilyMediclaim] })
  familyMediclaim2024_25: FamilyMediclaim[];

  @Prop({ type: [VehiclePassDetails] })
  vehiclePassDetails: VehiclePassDetails[];

  @Prop([String])
  tags: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
