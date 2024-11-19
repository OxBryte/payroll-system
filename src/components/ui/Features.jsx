

export default function Features() {
    const features = [
        {
          title: 'Effortless Task Management',
          description: 'Streamline your workflow and ensure tasks are completed on time.',
        },
        {
          title: 'Seamless Invoicing for Contractors',
          description: 'Create and send professional invoices with ease.',
        },
        {
          title: 'Comprehensive Task Tracking',
          description: 'Monitor progress and stay on top of your teams workload.',
        },
        {
          title: 'Simplified Invoicing Process',
          description: 'Generate invoices in seconds and get paid faster.',
        },
      ];
    
      return (
        <div className="container mx-auto my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
}
