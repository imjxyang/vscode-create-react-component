export function generateComponentTemplate(componentName: string) {
  return `
  
  type ${componentName}Props = {}

  export function ${componentName}({}: ${componentName}Props):JSX.Element {
    return (
      <div data-testid='${getKebabCaseNames(componentName)}'>
      
      </div>
    );
  }
  
  
  `;
}

export function generateTestTemplate(componentName: string) {
  return `
  import { render, screen } from '@testing-library/react';
  import { ${componentName} } from '../${componentName}';
  
  describe('${componentName}', () => {

  it('should render the component', () => {
    render(<${componentName} />);
    expect(screen.getByTestId('${getKebabCaseNames(
      componentName
    )}')).toBeInTheDocument();
  }
}
  `;
}

function getKebabCaseNames(componentName: string): string {
  return componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
