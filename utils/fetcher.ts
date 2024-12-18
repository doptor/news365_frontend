import instance from "./instance";

const fetcher = async (arg: string): Promise<any> => {
  const { data } = await instance.get(arg);

  return data.data;
};

export default fetcher;
