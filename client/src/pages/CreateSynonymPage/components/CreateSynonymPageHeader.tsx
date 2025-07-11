import { useTranslations } from "../../../translations/useTranslations";

export const CreateSynonymPageHeader = () => {
  const { translation } = useTranslations();

  return (
    <div className="create-synonym-page__header">
      <h1 className="create-synonym-page__title">
        <i>{translation('createSynonym.header.title')}</i>
      </h1>
      <p>
        {translation('createSynonym.header.description')} <br />
        {translation('createSynonym.header.description2')}
      </p>
    </div>
  );
};