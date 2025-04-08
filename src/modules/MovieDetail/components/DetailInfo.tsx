import { useDetailInfo } from "../MovieDetailContext";

const DetailInfo = () => {
  const detail = useDetailInfo();
  const notAvailable = () => <span className="italic text-neutral-400">Not available</span>;

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (!detail) return null; 

  // render detail info kayak production company, revenue, dll
  return (
    <div className="w-full max-w-container px-4 mt-4 mx-auto flex flex-col gap-4">
      <div className="flex flex-col gap-1 float-left">
        <p className="text-xs lg:text-sm font-medium">Overview</p>
        <p className="text-neutral-600">{detail?.overview || notAvailable()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs lg:text-sm font-medium">Status</p>
            <p className="text-neutral-600">
                {detail?.status || notAvailable()}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs lg:text-sm font-medium">Production Companies</p>
            <p className="text-neutral-600">
              {detail?.production_companies?.map((company: {
                name: string;
                origin_country: string;
              }) => `${company.name}${company.origin_country
                ? ` (${company.origin_country})`
                : ''}`).join(', ') || notAvailable()}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs lg:text-sm font-medium">Production Countries</p>
            <p className="text-neutral-600">
              {detail?.production_countries?.map((country: {
                name: string;
              }) => country.name).join(', ') || notAvailable()}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs lg:text-sm font-medium">Budget</p>
            <p className="text-neutral-600">
                {detail?.budget !== 0 ? USDollar.format(detail?.budget) : notAvailable()}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs lg:text-sm font-medium">Revenue</p>
            <p className="text-neutral-600">
                {detail?.revenue !== 0 ? USDollar.format(detail?.revenue) : notAvailable()}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs lg:text-sm font-medium">Spoken Languages</p>
            <p className="text-neutral-600">
              {detail?.spoken_languages?.map((lang: {
                english_name: string;
                name: string;
              }) => lang.english_name
                ? lang.english_name
                : lang.name).join(', ') || notAvailable()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
