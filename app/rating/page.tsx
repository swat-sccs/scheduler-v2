"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Textarea,
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  Select,
  SelectItem,
  Divider,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Selection,
  Link,
} from "@nextui-org/react";
import useSWR from "swr";
import { useState } from "react";
import React from "react";

//import { Search, Person, Class, Star } from "@mui/icons-material";
import Person from "@mui/icons-material/Person";
import Class from "@mui/icons-material/Class";
import Star from "@mui/icons-material/Star";

import Rating from "@mui/material/Rating";

import axios from "axios";
import { factory } from "typescript";
import { Alert } from "@mui/material";

const labels: { [index: string]: string } = {
  1: "Awful",
  2: "OK",
  3: "Good",
  4: "Great",
  5: "Awesome",
};
const diffLabels: { [index: string]: string } = {
  1: "Very Easy",
  2: "Easy",
  3: "Average",
  4: "Difficult",
  5: "Very Difficult",
};

const gradeOptions = [
  { key: "A+", label: "A+" },
  { key: "A", label: "A" },
  { key: "A-", label: "A-" },
  { key: "B+", label: "B+" },
  { key: "B", label: "B" },
  { key: "B-", label: "B-" },
  { key: "C+", label: "C+" },
  { key: "C", label: "C" },
  { key: "C-", label: "C-" },
  { key: "D+", label: "D+" },
  { key: "D", label: "D" },
  { key: "D-", label: "D-" },
  { key: "F", label: "F" },
  { key: "Audit/No Grade", label: "Audit/No Grade" },
  { key: "Dropped", label: "Dropped" },
  { key: "Not sure yet", label: "Not sure yet" },
  { key: "Rather Not Disclose", label: "Rather Not Disclose" },
];

function getDiffText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function RatingPage() {
  const [selectedProf, setSelectedProf]: any = useState(1);
  const [selectedClass, setSelectedClass]: any = useState();
  const [rating, setRating] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);
  const [diffValue, setDiffValue] = React.useState<number | null>(0);
  const [diffHover, setDiffHover] = React.useState(-1);
  const [takeAgain, setTakeAgain] = React.useState(false);
  const [forCredit, setForCredit] = React.useState(false);

  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(false);

  const [grade, setGrade] = React.useState<string>("");

  const [review, setReview] = React.useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetcher = (url: any) => fetch(url).then((r) => r.json());

  const {
    data: profs,
    isLoading,
    error,
  } = useSWR("/api/getProfs", fetcher, {});
  const {
    data: classes,
    isLoading: classesLoading,
    error: classesError,
  } = useSWR(`/api/getProfClasses?prof=${selectedProf}`, fetcher, {
    refreshInterval: 1000,
  });

  const onProfSelectionChange = (key: any) => {
    setSelectedProf(key);
  };
  const onClassSelectionChange = (key: any) => {
    console.log(key);
    setSelectedClass(key);
  };
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGrade(e.target.value);
  };

  async function submitReview() {
    //Reset all vals to defaults... Send to DB!
    if (!selectedClass || !selectedProf || rating == 0 || diffValue == 0) {
      alert("Please fill out all required fields!");
    } else {
      await axios
        .post("/api/submitReview", {
          courseID: selectedClass,
          facultyID: selectedProf,
          overallRating: rating,
          difficulty: diffValue,
          takeAgain: takeAgain,
          forCredit: forCredit,
          grade: grade,
          review: review,
        })
        .then(function (response) {
          // Handle response
          setRating(0);
          setDiffValue(0);
          setTakeAgain(false);
          setForCredit(false);
          setGrade("");
          setSelectedClass([]);
          setSelectedProf(1);
          setReview("");

          setSubmitSuccess(true);
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 5000);
        })
        .catch(function (error) {
          console.log(error);
          setSubmitError(true);
          setTimeout(() => {
            setSubmitError(false);
          }, 5000);
        });
    }
  }

  return (
    <>
      {submitSuccess ? (
        <Card className="absolute  top-30 right-20 border-green-700 bg-transparent border-2 w-1/12 h-8 justify-center ">
          Success!
        </Card>
      ) : (
        <></>
      )}

      {submitError ? (
        <Card className="absolute top-30 right-20 border-red-700 bg-transparent border-2 w-1/12 h-8 justify-center ">
          Error!
        </Card>
      ) : (
        <></>
      )}

      <Card className=" justify-center items-center place-items-center">
        <CardHeader className="">
          <h1 className=" text-center ml-auto mr-auto col-span-3 row-start-1 row-span-1  text-2xl mb-2 mt-2">
            Leave a Rating
          </h1>
        </CardHeader>
        <CardBody className="flex gap-5 md:px-20 px-10">
          <Autocomplete
            isRequired
            aria-label="Select Professor"
            className=" max-w-xs "
            label="Select Professor"
            labelPlacement="outside"
            placeholder="Select Professor"
            variant={"bordered"}
            size="lg"
            startContent={<Person />}
            selectedKey={selectedProf}
            onSelectionChange={onProfSelectionChange}
          >
            {profs?.map((prof: any) => (
              <AutocompleteItem key={prof.id} textValue={prof.displayName}>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="text-small">{prof.displayName}</span>
                    <span className="text-tiny text-default-400">
                      {prof.year}
                    </span>
                  </div>
                </div>
              </AutocompleteItem>
            ))}
          </Autocomplete>

          <Autocomplete
            isRequired
            aria-label="Select Class"
            className=" max-w-xs "
            label="Select Class"
            labelPlacement="outside"
            placeholder="Select Class"
            variant={"bordered"}
            size="lg"
            startContent={<Class />}
            selectedKey={selectedClass}
            onSelectionChange={onClassSelectionChange}
          >
            {classes?.map((thing: any) => (
              <AutocompleteItem
                key={thing.id}
                textValue={thing.subject + " " + thing.courseNumber}
              >
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="text-small">
                      {thing.subject} {thing.courseNumber}
                    </span>
                    <span className="text-tiny text-default-400">
                      Ref: {thing.courseReferenceNumber.replace(thing.year, "")}
                    </span>
                  </div>
                </div>
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Divider className="mt-5" orientation="horizontal" />

          <div className="mt-5">Rate Your Professor</div>
          <div className="grid grid-cols-2">
            <Rating
              className="ml-5"
              name="rate-prof"
              value={rating}
              precision={1}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                console.log(newValue);
                setRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <Star
                  style={{ opacity: 0.8, color: "grey" }}
                  fontSize="inherit"
                />
              }
            />
            {rating !== null && (
              <div className="ml-5">
                {labels[hover !== -1 ? hover : rating]}
              </div>
            )}
          </div>

          <div>How difficult was this professor?</div>
          <div className="grid grid-cols-2 mb-5">
            <Rating
              className="ml-5"
              name="rate-prof-diff"
              value={diffValue}
              precision={1}
              getLabelText={getDiffText}
              onChange={(event, newValue) => {
                console.log(newValue);
                setDiffValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setDiffHover(newHover);
              }}
              emptyIcon={
                <Star
                  style={{ opacity: 0.8, color: "grey" }}
                  fontSize="inherit"
                />
              }
            />
            {diffValue !== null && (
              <div className="ml-5">
                {diffLabels[diffHover !== -1 ? diffHover : diffValue]}
              </div>
            )}
          </div>

          <div>Would you take this professor again?</div>
          <Checkbox
            className="ml-5"
            isSelected={takeAgain}
            onValueChange={setTakeAgain}
          >
            Yes! <div className="text-tiny">(leave blank for no)</div>
          </Checkbox>

          <div>Did you mark this class as CR/NC?</div>
          <Checkbox
            className="ml-5"
            isSelected={forCredit}
            onValueChange={setForCredit}
          >
            Yes! <div className="text-tiny">(leave blank for no)</div>
          </Checkbox>

          <div>Select grade recieved</div>
          <Select
            selectionMode="single"
            isRequired
            selectedKeys={[grade]}
            placeholder="SelectGrade"
            className="max-w-xs"
            onChange={handleSelectionChange}
          >
            {gradeOptions.map((grade) => (
              <SelectItem key={grade.key}>{grade.label}</SelectItem>
            ))}
          </Select>

          <Textarea
            value={review}
            size="lg"
            className=""
            rows={5}
            labelPlacement="outside"
            disableAutosize
            label="Write a Review"
            placeholder="What did you think of this prof/class?"
            onValueChange={setReview}
          />
        </CardBody>

        <Button
          onPress={onOpen}
          color="primary"
          className="mb-10 mt-10"
          size="lg"
        >
          Submit
        </Button>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          backdrop={"blur"}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Confirm Rating Submission
                </ModalHeader>
                <ModalBody>
                  <div>
                    By submiting a rating to SCCS you agree to abide by the SCCS
                    <Link
                      className="ml-1 mr-1"
                      isExternal
                      href="https://www.sccs.swarthmore.edu/docs/policy"
                      title="SCCS Usage & Data Policy"
                    >
                      <span className=" underline"> Usage & Data Policy </span>
                    </Link>
                  </div>

                  <p>
                    While reviews submitted through this site are completly
                    anonymous we collect user identifiable information for the
                    saftey and continued usage of this platform. We do reserve
                    the right to remove reviews that are not in good spirit.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={onClose}
                    onClick={submitReview}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Card>
    </>
  );
}
