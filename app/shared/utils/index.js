import moment from "moment";
import mongoose from "mongoose";

export const paginate = ({ page, pageSize }) => {
  const offset = (parseInt(page) - 1) * pageSize;
  const limit = parseInt(pageSize);

  return {
    offset,
    limit,
  };
};

export const pageCount = ({ count, page, pageSize }) => {
  const pageTotal = Math.ceil(count / pageSize);
  let prevPage = null;
  let nextPage = null;

  if (page == pageTotal && page > 1) {
    prevPage = parseInt(page) - 1;
    nextPage = null;
  } else if (page > 1) {
    prevPage = parseInt(page) - 1;
    nextPage = parseInt(page) + 1;
  } else if (page == 1 && pageTotal > 1) {
    nextPage = 2;
  }

  return {
    prevPage,
    currentPage: parseInt(page),
    nextPage,
    pageTotal,
    pageSize: pageSize > count ? parseInt(count) : parseInt(pageSize),
  };
};

export const IsObjectId = async (value) => {
  try {
    return (
      value &&
      value.length > 12 &&
      String(new mongoose.Types.ObjectId(value)) === String(value)
    );
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const search = async (params) => {
  console.log(
    "🚀 ~ file: misc.service.ts:71 ~ MiscCLass ~ search ~ params:",
    params
  );
  let query = {};
  let date;
  let endDate;
  for (const value in params) {
    if (value.match(/date|Date|createdAt|endDate|startDate/g)) {
      if (value == "startDate") date = new Date(params[value]);
      if (value == "endDate") endDate = new Date(params[value]);
      if (value !== "startDate" && value !== "endDate") {
        date = new Date(params[value]);
        endDate = new Date(moment(date).add(1, "day").format());
      }
      if (value == "date") {
        query["date"] = { $gte: date, $lte: endDate };
      } else {
        query["createdAt"] = { $gte: date, $lte: endDate };
      }
    } else if (await IsObjectId(String(params[value]))) {
      query[value] = params[value];
    } else if (value == "recepient") {
      query = {
        ...query,
        $or: [{ user: params[value] }, { counsellor: params[value] }],
      };
    } else if (params[value] == "true" || params[value] == true) {
      query[value] = true;
    } else if (params[value] == "false" || params[value] == false) {
      query[value] = false;
    } else if (value == "category" || value == "categories") {
      query[value] = { $in: params[value] };
    } else {
      const $regex = new RegExp(params[value]);
      const $options = "i";
      query[value] = { $regex, $options };
    }
  }
  return query;
};

export const globalSearch = async (query) => {
  const $regex = new RegExp(query);
  const $options = "i";
  return { $regex, $options };
};
