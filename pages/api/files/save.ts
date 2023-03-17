import { IBody } from '@/lib/api/file';
import Data from '@/lib/data';
import { BedType } from '@/lib/type';
import { NextApiRequest, NextApiResponse } from 'next/types';

interface IBedList {
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {
      userId,
      largeBuildingType,
      buildingType,
      roomType,
      bedroomCount,
      bedCount,
      bedList,
      bathroomCount,
      country,
      city,
      district,
      political,
      streetAddress,
      postcode,
      latitude,
      longitude,
      roomImage,
      description,
      price,
      checkIn,
      checkOut,
      adults,
      teenager,
      children,
      purchase,
    }: IBody = req.body;

    const amentities: string[] = req.body.amentities;
    const amenString = amentities.join();

    const data = {
      userId,
      largeBuildingType,
      buildingType,
      roomType,
      bedroomCount,
      bedCount,
      bathroomCount,
      country,
      city,
      district,
      political,
      streetAddress,
      postcode,
      latitude,
      longitude,
      roomImage,
      description,
      price,
      checkIn,
      checkOut,
      adults,
      teenager,
      children,
      purchase,
    };

    await Data.user.writeRoomDB(data, amenString);

    const latestRoom = await Data.user.getLastRoomDB();

    if (bedList !== undefined) {
      const writeBedList = async () => {
        for (let i = 0; i < bedList?.length; i++) {
          await Data.user.writeBedListDB(latestRoom!.id);
        }
      };

      writeBedList();
    }

    res.json({ data, bedList });
  }
};
