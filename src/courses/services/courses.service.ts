import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CourseRepository } from '../repositories.ts/course.repository';
import { Course } from '../entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.courseRepository.createCourse(createCourseDto);
  }

  async findAll() {
    return await this.courseRepository.findAllCourses();
  }

  async findOne(id: number): Promise<Course | null> {
    const course = await this.courseRepository.findOneCourse(id);
    const invalidCredentialsError = new UnauthorizedException(
      'Invalid Course ID',
    );
    if (!course) {
      throw invalidCredentialsError;
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const updateCourse = await this.courseRepository.updateCourse(
      id,
      updateCourseDto,
    );
    return updateCourse;
  }

  async remove(id: number) {
    return await this.courseRepository.removeCourse(id);
  }
}
