export default function JobPreviewBackground() {
  // This component renders a grid of job preview cards in the background
  const jobPreviews = [
    { id: 1, title: "Dog Walking", pay: "0.05 ETH", location: "San Francisco" },
    { id: 2, title: "Grocery Delivery", pay: "0.03 ETH", location: "New York" },
    { id: 3, title: "Lawn Mowing", pay: "0.02 ETH", location: "Austin" },
    { id: 4, title: "House Cleaning", pay: "0.04 ETH", location: "Miami" },
    { id: 5, title: "Tutoring", pay: "0.06 ETH", location: "Chicago" },
    { id: 6, title: "Food Delivery", pay: "0.025 ETH", location: "Seattle" },
    { id: 7, title: "Furniture Assembly", pay: "0.07 ETH", location: "Boston" },
    { id: 8, title: "Car Wash", pay: "0.015 ETH", location: "Los Angeles" },
    { id: 9, title: "Web Development", pay: "0.1 ETH", location: "Remote" },
    { id: 10, title: "Logo Design", pay: "0.08 ETH", location: "Remote" },
    { id: 11, title: "Content Writing", pay: "0.04 ETH", location: "Remote" },
    { id: 12, title: "Social Media", pay: "0.03 ETH", location: "Remote" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 h-full">
      {jobPreviews.map((job) => (
        <div
          key={job.id}
          className="border border-theme-cyan/20 rounded-lg p-4 shadow-sm bg-theme-deeper-purple/40 backdrop-blur-sm"
        >
          <h3 className="font-medium text-white">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{job.location}</p>
          <p className="text-sm font-semibold mt-2 text-theme-cyan">{job.pay}</p>
        </div>
      ))}
    </div>
  )
}
