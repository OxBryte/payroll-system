export default function Features() {
  const features = [
    {
      title: "Organization Management",
      description:
        "Streamline your workflow and ensure tasks are completed on time.",
    },
    {
      title: "Employee Management",
      description: "Create and send professional invoices with ease.",
    },
    {
      title: "Salary Operations",
      description: "Monitor progress and stay on top of your teams workload.",
    },
  ];

  return (
    <div className="container mx-auto my-12 w-full gap-10 py-14 flex flex-col items-center justify-center min-h-[30dvh]">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-[52px] text-center max-w-[540px] leading-tight font-[600]">
          Features to Elevate Your Business
        </h1>
        <div className="w-[86px] rounded-full mt-[-12px] h-1 bg-purple-700" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center max-w-[1060px]">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white flex flex-col gap-4 border-1 border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="w-full h-[86px]"></div>
            <h3 className="text-[20px] font-medium">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
