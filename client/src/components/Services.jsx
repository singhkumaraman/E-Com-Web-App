import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";

const Services = () => {
  return (
    <section className="bg-white mt-20 mb-20">
      <div className="flex justify-center gap-12 ">
        <div className="bg-gray-100 border border-gray-100 p-10 py-32 rounded-xl">
          <TbTruckDelivery className="text-blue-600 text-4xl m-auto" />
          <p className="font-semibold ">Super Fast and Free Delivery</p>
        </div>
        <div>
          <div className="bg-gray-100 border border-gray-100 mb-4 py-12 px-4 rounded-xl">
            <GiReceiveMoney className="text-blue-600 text-4xl m-auto" />
            <p className="font-semibold ml-6">Money-back Guaranteed</p>
          </div>
          <div className="bg-gray-100 border border-gray-100 mt-4 py-12 px-4 rounded-xl">
            <RiSecurePaymentLine className="text-blue-600 text-4xl m-auto" />
            <p className="font-semibold ">Super Secure Payment System</p>
          </div>
        </div>
        <div className="bg-gray-100 border border-gray-100 p-10 py-32 rounded-xl">
          <MdSecurity className="text-blue-600 text-4xl m-auto" />
          <p className="font-semibold ">Non-contact Shipping</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
