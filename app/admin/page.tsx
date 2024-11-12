"use client";

import useSWR from "swr";
import { useState } from "react";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { MoreVert } from "@mui/icons-material";
import axios from "axios";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const fetcher = (url: any) => fetch(url).then((r) => r.json());

  const {
    data: ratings,
    isLoading,
    error,
  } = useSWR("/api/getRatings", fetcher, { refreshInterval: 5000 });
  let columns = [];
  let filtered_ratings: any = [];

  if (!isLoading) {
    for (let rating of ratings) {
      const name = rating.User?.name;
      const email = rating.User?.email;
      rating.name = name;
      rating.email = email;

      filtered_ratings.push(rating);
    }

    if (filtered_ratings.length > 0) {
      for (let key in filtered_ratings[0]) {
        if (key != "User") {
          columns.push({ key: key, label: key });
        }
      }
    }
    columns.push({ key: "actions", value: "actions" });
  }

  async function deleteRating(ratingID: any) {
    console.log("Rating Gone, finito, finished");
    await axios
      .post("/api/deleteRating", {
        ratingID: ratingID,
      })
      .then(function (response) {
        // Handle response
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof any];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <MoreVert className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => deleteRating(user.id)}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (status === "authenticated") {
    if (session.user?.role === "admin") {
      return (
        <div className="w-[90vw]">
          <Table
            isHeaderSticky
            className="overflow-scroll scrollbar-thin scrollbar-thumb-accent-500 scrollbar-track-transparent"
            fullWidth
            aria-label="Rating table with dynamic content(ratings)"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={filtered_ratings}>
              {(item: any) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      );
    }
  }
}
