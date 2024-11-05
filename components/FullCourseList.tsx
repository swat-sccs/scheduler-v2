import { Course, Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import CourseCard from "./CourseCard";
import { getPlanCookie } from "../app/actions";

async function getCourses(query: string, term: string, dotw: Array<String>) {
  //let DOTW: Array<String> = dotw.split(",");
  let times = ["0955"];
  console.log(dotw);
  return await prisma.course.findMany({
    include: {
      sectionAttributes: true,
      facultyMeet: {
        include: {
          meetingTimes: true,
        },
      },
      instructor: true,
    },

    orderBy: {
      courseTitle: "desc",
    },
    where: {
      year: term,

      OR: [
        {
          facultyMeet: {
            meetingTimes: {
              is: {
                monday: dotw.includes("monday") ? true : Prisma.skip,
                tuesday: dotw.includes("tuesday") ? true : Prisma.skip,
                wednesday: dotw.includes("wednesday") ? true : Prisma.skip,
                thursday: dotw.includes("thursday") ? true : Prisma.skip,
                friday: dotw.includes("friday") ? true : Prisma.skip,
                saturday: dotw.includes("saturday") ? true : Prisma.skip,
                sunday: dotw.includes("sunday") ? true : Prisma.skip,
              },
            },
          },
        },
        {
          courseTitle: {
            search: query.replace(/[\s\n\t]/g, "_"),
          },

          subject: {
            search: query.replace(/[\s\n\t]/g, "_"),
          },

          courseNumber: {
            search: query.replace(/[\s\n\t]/g, "_"),
          },

          instructor: {
            displayName: {
              search: query.replace(/[\s\n\t]/g, "_"),
            },
          },
        },
      ],
    },

    /*

    facultyMeet: {
        meetingTimes: {
          OR: [
            {
              monday: dotw.includes("monday"),
            },
            {
              tuesday: dotw.includes("tuesday"),
            },
            {
              wednesday: dotw.includes("wednesday"),
            },
            {
              thursday: dotw.includes("thursday"),
            },
            {
              friday: dotw.includes("friday"),
            },
            {
              saturday: dotw.includes("saturday"),
            },
            {
              sunday: dotw.includes("sunday"),
            },
          ],
        },
      },
    where: {
      AND: [
        {
        OR: [
          { year: term },
          {
            
                facultyMeet: {
                  OR: [
                    {
                      meetingTimes: {
                        monday: dotw.includes("monday"),
                      },
                    },
                    {
                      meetingTimes: {
                        tuesday: dotw.includes("tuesday"),
                      },
                    },
                    {
                      meetingTimes: {
                        wednesday: dotw.includes("wednesday"),
                      },
                    },
                    {
                      meetingTimes: {
                        thursday: dotw.includes("thursday"),
                      },
                    },
                    {
                      meetingTimes: {
                        friday: dotw.includes("friday"),
                      },
                    },
                    {
                      meetingTimes: {
                        saturday: dotw.includes("saturday"),
                      },
                    },
                    {
                      meetingTimes: {
                        sunday: dotw.includes("sunday"),
                      },
                    },
                  ],
                },
          }

        ],}
        

       
        /*
        times.length > 0
          ? {
              facultyMeet: {
                OR: [
                  {
                    meetingTimes: {
                      monday: dotw.includes("monday"),
                    },
                  },
                  {
                    meetingTimes: {
                      tuesday: dotw.includes("tuesday"),
                    },
                  },
                  {
                    meetingTimes: {
                      wednesday: dotw.includes("wednesday"),
                    },
                  },
                  {
                    meetingTimes: {
                      thursday: dotw.includes("thursday"),
                    },
                  },
                  {
                    meetingTimes: {
                      friday: dotw.includes("friday"),
                    },
                  },
                  {
                    meetingTimes: {
                      saturday: dotw.includes("saturday"),
                    },
                  },
                  {
                    meetingTimes: {
                      sunday: dotw.includes("sunday"),
                    },
                  },
                ],
              },
            }
          : {},
        {
          OR: [
            {
              courseTitle: {
                search: query.replace(/[\s\n\t]/g, "_"),
              },
            },
            {
              subject: {
                search: query.replace(/[\s\n\t]/g, "_"),
              },
            },

            {
              courseNumber: {
                search: query.replace(/[\s\n\t]/g, "_"),
              },
            },
            {
              instructor: {
                displayName: {
                  search: query.replace(/[\s\n\t]/g, "_"),
                },
              },
            },
          ],
        },
      ],
    },

    */
    /* Old where
    where: {
      ...(query || term
        ? {
            OR: [
              {
                courseTitle: {
                  search: query.replace(/[\s\n\t]/g, "_"),
                },
              },
              {
                subject: {
                  search: query.replace(/[\s\n\t]/g, "_"),
                },
              },
              {
                courseNumber: {
                  search: query.replace(/[\s\n\t]/g, "_"),
                },
              },
              {
                instructor: {
                  displayName: {
                    search: query.replace(/[\s\n\t]/g, "_"),
                  },
                },
              },
            ],
          }
        : {}),
        
    },*/
  });
}

export async function FullCourseList({
  query,
  term,
  dotw,
}: {
  query: string;
  term: string;
  dotw: Array<String>;
}) {
  const courseList: Course[] = await getCourses(query, term, dotw);

  return (
    <>
      <div className="grid gap-4 ">
        {courseList?.map((course: any) => (
          <div key={course.id}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </>
  );
}
