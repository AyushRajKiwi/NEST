import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from 'src/courses/dto/create-course.dto';
import { UpdateCourseDto } from 'src/courses/dto/update-course.dto';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}
  async createCourse(createCourseDto: CreateCourseDto) {
    try {
      const courseEntity = this.coursesRepository.create({
        name: createCourseDto.name,
        description: createCourseDto.description,
        level: createCourseDto.level,
        price: createCourseDto.price,
      });
      return await this.coursesRepository.save(courseEntity);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err as { code?: string };
      const DUPLICATE_KEY_CODE = '23505';
      if (errorMessage.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException('Course already exists');
      }
      throw err;
    }
  }

  async findAllCourses(): Promise<Course[]> {
    return await this.coursesRepository.find();
  }

  async findOneCourse(id: number): Promise<Course | null> {
    const course = await this.coursesRepository.findOne({ where: { id: id } });
    return course;
  }

  async updateCourse(id: number, updateCourseDto: UpdateCourseDto) {
    await this.coursesRepository.update(id, updateCourseDto);
    const updatedCourse = await this.coursesRepository.findOne({
      where: { id: id },
    });
    if (!updatedCourse) {
      throw new NotFoundException('Course with ID ${id} not found');
    }
    return updatedCourse;
  }

  async removeCourse(id: number) {
    await this.coursesRepository.delete(id);
    const courseToRemove = await this.coursesRepository.findOne({
      where: { id: id },
    });
    if (!courseToRemove) {
      throw new NotFoundException('Course deleted');
    }
    return await this.coursesRepository.remove(courseToRemove);
  }
}
