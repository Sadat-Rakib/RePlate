// Currency API utilities
export interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  symbol?: string;
}

export interface CurrencyConversion {
  from: string;
  to: string;
  amount: number;
  convertedAmount: number;
  rate: number;
  timestamp: Date;
}

export interface ImpactMetrics {
  totalDonations: number;
  currency: string;
  conversions: CurrencyConversion[];
  averagePerDonation: number;
  topCurrencies: CurrencyRate[];
}

export class CurrencyService {
  private baseUrl = 'https://api.exchangerate-api.com/v4/latest';
  private fallbackUrl = 'https://api.fixer.io/latest';

  async getExchangeRates(baseCurrency = 'USD'): Promise<CurrencyRate[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${baseCurrency}`);
      const data = await response.json();
      
      if (data.rates) {
        return Object.entries(data.rates).map(([code, rate]) => ({
          code,
          name: this.getCurrencyName(code),
          rate: rate as number,
          symbol: this.getCurrencySymbol(code),
        }));
      }
      
      throw new Error('No rates data received');
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return this.getFallbackRates();
    }
  }

  async convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<CurrencyConversion> {
    try {
      const response = await fetch(`${this.baseUrl}/${fromCurrency}`);
      const data = await response.json();
      
      const rate = data.rates[toCurrency];
      if (!rate) {
        throw new Error(`Exchange rate not found for ${toCurrency}`);
      }
      
      const convertedAmount = amount * rate;
      
      return {
        from: fromCurrency,
        to: toCurrency,
        amount,
        convertedAmount: Math.round(convertedAmount * 100) / 100,
        rate,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Error converting currency:', error);
      throw new Error('Failed to convert currency');
    }
  }

  async calculateImpactMetrics(
    donations: Array<{ amount: number; currency: string; date: Date }>
  ): Promise<ImpactMetrics> {
    try {
      // Convert all donations to USD for comparison
      const conversions: CurrencyConversion[] = [];
      let totalInUSD = 0;

      for (const donation of donations) {
        if (donation.currency === 'USD') {
          totalInUSD += donation.amount;
          conversions.push({
            from: 'USD',
            to: 'USD',
            amount: donation.amount,
            convertedAmount: donation.amount,
            rate: 1,
            timestamp: donation.date,
          });
        } else {
          const conversion = await this.convertCurrency(
            donation.amount,
            donation.currency,
            'USD'
          );
          conversions.push(conversion);
          totalInUSD += conversion.convertedAmount;
        }
      }

      // Get current exchange rates for display
      const rates = await this.getExchangeRates();
      const topCurrencies = rates
        .filter(r => ['EUR', 'GBP', 'CAD', 'AUD', 'JPY'].includes(r.code))
        .slice(0, 5);

      return {
        totalDonations: Math.round(totalInUSD * 100) / 100,
        currency: 'USD',
        conversions,
        averagePerDonation: donations.length > 0 
          ? Math.round((totalInUSD / donations.length) * 100) / 100 
          : 0,
        topCurrencies,
      };
    } catch (error) {
      console.error('Error calculating impact metrics:', error);
      throw new Error('Failed to calculate impact metrics');
    }
  }

  private getCurrencyName(code: string): string {
    const currencyNames: Record<string, string> = {
      USD: 'US Dollar',
      EUR: 'Euro',
      GBP: 'British Pound',
      CAD: 'Canadian Dollar',
      AUD: 'Australian Dollar',
      JPY: 'Japanese Yen',
      CHF: 'Swiss Franc',
      CNY: 'Chinese Yuan',
      INR: 'Indian Rupee',
      BRL: 'Brazilian Real',
      // Add more as needed
    };
    
    return currencyNames[code] || code;
  }

  private getCurrencySymbol(code: string): string {
    const currencySymbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      CAD: 'C$',
      AUD: 'A$',
      JPY: '¥',
      CHF: 'CHF',
      CNY: '¥',
      INR: '₹',
      BRL: 'R$',
      // Add more as needed
    };
    
    return currencySymbols[code] || code;
  }

  private getFallbackRates(): CurrencyRate[] {
    // Fallback static rates (should be updated periodically)
    return [
      { code: 'EUR', name: 'Euro', rate: 0.85, symbol: '€' },
      { code: 'GBP', name: 'British Pound', rate: 0.75, symbol: '£' },
      { code: 'CAD', name: 'Canadian Dollar', rate: 1.25, symbol: 'C$' },
      { code: 'AUD', name: 'Australian Dollar', rate: 1.35, symbol: 'A$' },
      { code: 'JPY', name: 'Japanese Yen', rate: 110, symbol: '¥' },
    ];
  }
}