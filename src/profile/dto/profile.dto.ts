import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

class BasicInfoDto {
  @ApiProperty() employeeNo: string;
  @ApiProperty() firstName: string;
  @ApiProperty() middleName: string;
  @ApiProperty() lastName: string;
  @ApiProperty() personalEmail: string;
}

class EmergencyContactDto {
  @ApiProperty() name: string;
  @ApiProperty() number: string;
}

class ContactInfoDto {
  @ApiProperty() workEmail: string;
  @ApiProperty() workPhone: string;
  @ApiProperty() mobilePhone: string;
  @ApiProperty() residencePhone: string;
  @ApiProperty({ type: EmergencyContactDto }) emergencyContact: EmergencyContactDto;
}

class WorkDto {
  @ApiProperty() department: string;
  @ApiProperty() dateOfJoining: string;
  @ApiProperty() location: string;
  @ApiProperty() timezone: string;
  @ApiProperty() shift: string;
  @ApiProperty() seatingLocation: string;
  @ApiProperty() salaryRevisionDueOn: string;
  @ApiProperty() symphonyAccessCardNo: string;
}

class PersonalDto {
  @ApiProperty() birthDate: string;
  @ApiProperty() maritalStatus: string;
  @ApiProperty() aadhaarNumber: string;
  @ApiProperty() esicNumber: string;
  @ApiProperty() uan: string;
  @ApiProperty() tshirtSize: string;
  @ApiProperty() permanentAddress: string;
  @ApiProperty() presentAddress: string;
  @ApiProperty() age: number;
  @ApiProperty() bloodGroup: string;
  @ApiProperty() pan: string;
  @ApiProperty() epfNo: string;
}

class SummaryDto {
  @ApiProperty() jobDescription: string;
  @ApiProperty({ type: [String] }) askMeAbout: string[];
  @ApiProperty() experience: string;
  @ApiProperty() aboutMe: string;
}

class PassportDetailsDto {
  @ApiProperty() passportNumber: string;
  @ApiProperty() passportExpiry: string;
  @ApiProperty() visaNumber: string;
  @ApiProperty() visaExpiry: string;
}

class WorkExperienceDto {
  @ApiProperty() company: string;
  @ApiProperty() role: string;
  @ApiProperty() from: string;
  @ApiProperty() to: string;
}

class FamilyMediclaimDto {
  @ApiProperty() member: string;
  @ApiProperty() relation: string;
  @ApiProperty() dob: string;
  @ApiProperty() sumInsured: number;
}

class VehiclePassDetailsDto {
  @ApiProperty() vehicleType: string;
  @ApiProperty() registrationNo: string;
  @ApiProperty() validTill: string;
}

export class ProfileDto {
  @ApiProperty() userId: string; // ObjectId as string

  @ApiProperty({ type: BasicInfoDto }) basicInfo: BasicInfoDto;

  @ApiProperty({ type: ContactInfoDto }) contactInfo: ContactInfoDto;

  @ApiProperty({ type: WorkDto }) work: WorkDto;

  @ApiProperty({ type: PersonalDto }) personal: PersonalDto;

  @ApiProperty({ type: SummaryDto }) summary: SummaryDto;

  @ApiProperty({ type: PassportDetailsDto }) passportDetails: PassportDetailsDto;

  @ApiProperty({ type: [WorkExperienceDto] }) workExperience: WorkExperienceDto[];

  @ApiProperty({ type: [FamilyMediclaimDto] }) familyMediclaim2024_25: FamilyMediclaimDto[];

  @ApiProperty({ type: [VehiclePassDetailsDto] }) vehiclePassDetails: VehiclePassDetailsDto[];

  @ApiProperty({ type: [String] }) tags: string[];
  
}
