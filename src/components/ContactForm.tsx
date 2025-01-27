import AnimatedButton from "./AnimatedButton";
import { FormType } from "./Sections";

type Props = {
  handleChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  form: FormType;
};

const ContactForm = ({
  handleChange,
  handleSubmit,
  isLoading,
  form,
}: Props) => {
  return (
    <div className="w-full max-w-md relative overflow-hidden z-10 bg-gray-800/10 border border-gray-800 backdrop-blur-md p-4 md:p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-2xl after:top-24 after:-right-12">
      <h2 className="text-2xl font-bold text-white">Hire Me</h2>
      <p className="text-gray-300 font-thin text-base italic mb-6">
        Let's create something amazing together.
      </p>

      <form onSubmit={handleSubmit} method="post" action="#">
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-300"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            onChange={handleChange}
            className="mt-1 p-2 w-full bg-gray-800 border border-gray-600 rounded-md text-white disabled:text-gray-500"
            type="text"
            name="name"
            value={form?.name}
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-300"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="mt-1 p-2 w-full bg-gray-800 border border-gray-600 rounded-md text-white disabled:text-gray-500"
            name="email"
            id="email"
            type="email"
            onChange={handleChange}
            value={form?.email}
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-300"
            htmlFor="bio"
          >
            Short Message
          </label>
          <textarea
            className="mt-1 p-2 w-full bg-gray-800 border border-gray-600 rounded-md text-white resize-none disabled:text-gray-500"
            rows={3}
            id="bio"
            onChange={handleChange}
            name="message"
            value={form?.message}
            disabled={isLoading}
          ></textarea>
        </div>
        <div className="flex justify-end mt-8">
          <AnimatedButton isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
