import { IBody } from '@/lib/api/file';
import Data from '@/lib/data';
import { NextApiRequest, NextApiResponse } from 'next/types';

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
    }: IBody = req.body;

    const amentities: string[] = req.body.amentities;
    const amenString = amentities.join();

    bedList?.map((bedidx) =>
      bedidx.beds.map((bed) =>
        Data.user.writeBedsDB(bedidx.id, bed.type, bed.count),
      ),
    );

    bedList?.map((bedidx) => Data.user.writeBedListDB(bedidx.id));

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
    };

    Data.user.writeRoomDB(data, amenString);

    res.json(data);
  }
};
