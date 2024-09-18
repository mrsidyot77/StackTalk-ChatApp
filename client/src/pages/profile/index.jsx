import { useAppStore } from "@/store";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { UPDATE_PROFILE_ROUTE, ADD_PROFILE_IMAGE_ROUTE, HOST } from "@/utils/constants.js";

function Profile() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef();

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if(userInfo.image){
      console.log(userInfo.image);
      
      setImage(`${HOST}/${userInfo.image}`)
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is required.");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is required.");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );
        console.log(response);

        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
        

          toast.success("User profile updated successfully.");
          navigate("/chat");
          
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup your profile.");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    console.log({file});
    const formData = new FormData()
    formData.append("profile-image",file)
    const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
      withCredentials: true
    })
    if(response.status === 200 && response.data.image){
      setUserInfo({...userInfo, image: response.data.image})
      toast.success("Profile Image updated successfully.")
    }
  };

  const handleImageDelete = async (e) => {};

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-1">
      <div className="fley fley-col nan-10 n_190vwl mdew-mas">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidder">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profileImage"
                  className="w-full h-full object-cover bg-black rounded-full"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )} `}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div
                className="absolute flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full  "
                onClick={image ? handleImageDelete : handleFileInputClick}
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept=".png, .jpeg, .jpg, .svg, .wepg,"
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className=" w-full ">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              />
            </div>
            <div className=" w-full ">
              <Input
                placeholder="First Name"
                type="text"
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className=" w-full ">
              <Input
                placeholder="Last Name"
                type="text"
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none "
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex w-full gap-5 ">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedColor === index
                      ? "outline outline-white/50 outline-2 "
                      : ""
                  }
                    `}
                  key={index}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-12 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 my-6"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
