import React from "react";

type Props = {
  handleSubmit?: () => void;
  form?: any;
  handleChange?: () => void;
  isLoading?: boolean;
};

const ContactFormOld = ({
  handleSubmit,
  form,
  handleChange,
  isLoading,
}: Props) => {
  return (
    <>
      <h2 className="text-xl sm:text-3xl w-0 hover:w-[13ch] whitespace-nowrap bg-gradient font-bold hover:text-transparent text-white transition-custom bg-clip-text">
        Contact Me
      </h2>
      <div className="md:w-96 rounded-md bg-gradient p-1 mt-4 relative before:absolute before:w-full before:h-full before:-z-10 before:bg-gradient before:left-0 before:top-0 before:blur-[40px]">
        <div className="p-8 rounded-md w-full max-w-full bg-white">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="font-medium text-gray-900 block mb-1 text-sm md:text-base"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              className="block w-full rounded-md border-0 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-3 md:py-3 py-2 text-sm md:text-base disabled:text-gray-500"
              onChange={handleChange}
              disabled={isLoading}
            />
            <label
              htmlFor="email"
              className="font-medium text-gray-900 block mb-1 md:mt-8 mt-2 text-sm md:text-base"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              className="block w-full rounded-md border-0 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-3 md:py-3 py-2 text-sm md:text-base disabled:text-gray-500"
              onChange={handleChange}
              disabled={isLoading}
            />
            <label
              htmlFor="email"
              className="font-medium text-gray-900 block mb-1 md:mt-8 mt-2 text-sm md:text-base"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={form.message}
              className="h-32 block w-full rounded-md border-0 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3 text-sm md:text-base resize-none disabled:text-gray-500"
              onChange={handleChange}
              disabled={isLoading}
            />
            <button className="bg-indigo-600 text-white md:py-4 md:px-8 py-2 px-4 rounded-lg font-bold text-sm md:text-lg md:mt-16 mt-4 ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactFormOld;
