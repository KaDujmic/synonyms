import { Header } from "../../../features/Header/components/Header";

interface ErrorPageProps {
    title: string;
    description: string;
    image: string;
    showHeader?: boolean;
}

export const ErrorPage = ({title, description, image, showHeader = true}: ErrorPageProps) => {
    return (
      <>
        {showHeader && <Header />}
        <main>
            <div className="main-container error-page">
                <h1>{title}</h1>
                <p>{description}</p>
                <img src={image} alt="Error" />
                <div>
                    <span> Try these links instead:</span>
                    {' '}
                    <span>
                        <a href="/">Home</a>
                    </span>
                </div>
            </div>
        </main>
      </>
    )
}